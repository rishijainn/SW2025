import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  project: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log(`Received ${req.method} request to ${req.url}`);
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    console.log("Handling CORS preflight request");
    return new Response(null, { headers: corsHeaders });
  }

  // Only allow POST requests for the actual email sending
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ 
        error: "Method not allowed. Use POST to send emails.",
        success: false 
      }),
      {
        status: 405,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }

  try {
    // Check if API key exists
    const apiKey = Deno.env.get("RESEND_API_KEY");
    console.log("API Key check:", apiKey ? `Found (${apiKey.substring(0, 8)}...)` : "Not found");
    
    if (!apiKey) {
      console.error("RESEND_API_KEY environment variable is not set");
      return new Response(
        JSON.stringify({ 
          error: "Email service configuration error",
          success: false 
        }),
        {
          status: 500,
          headers: { 
            "Content-Type": "application/json", 
            ...corsHeaders 
          },
        }
      );
    }

    // Parse request body
    let requestData: ContactEmailRequest;
    try {
      const bodyText = await req.text();
      console.log("Request body received:", bodyText.substring(0, 100) + "...");
      requestData = JSON.parse(bodyText);
    } catch (parseError) {
      console.error("Failed to parse request body:", parseError);
      return new Response(
        JSON.stringify({ 
          error: "Invalid JSON in request body",
          success: false 
        }),
        {
          status: 400,
          headers: { 
            "Content-Type": "application/json", 
            ...corsHeaders 
          },
        }
      );
    }

    const { name, email, project, message } = requestData;

    // Validate required fields
    if (!name || !email || !message) {
      console.log("Validation failed:", { name: !!name, email: !!email, message: !!message });
      return new Response(
        JSON.stringify({ 
          error: "Missing required fields: name, email, and message are required",
          success: false,
          received: { name: !!name, email: !!email, project: !!project, message: !!message }
        }),
        {
          status: 400,
          headers: { 
            "Content-Type": "application/json", 
            ...corsHeaders 
          },
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("Invalid email format:", email);
      return new Response(
        JSON.stringify({ 
          error: "Invalid email format",
          success: false 
        }),
        {
          status: 400,
          headers: { 
            "Content-Type": "application/json", 
            ...corsHeaders 
          },
        }
      );
    }

    console.log("Processing valid request:", { name, email, project: project || 'Not specified' });

    // Sanitize HTML content to prevent XSS
    const sanitizeHtml = (text: string) => {
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    };

    const sanitizedName = sanitizeHtml(name);
    const sanitizedEmail = sanitizeHtml(email);
    const sanitizedProject = project ? sanitizeHtml(project) : 'Not specified';
    const sanitizedMessage = sanitizeHtml(message);

    // Send notification email to Stackwise
    console.log("Attempting to send notification email...");
    let notificationResponse;
    try {
      // Use a verified domain email or the default resend domain
      notificationResponse = await resend.emails.send({
        from: "Stackwise Contact <onboarding@resend.dev>",
        to: ["stackwise7@gmail.com"],
        subject: `New Contact Form Submission from ${sanitizedName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #333; border-bottom: 2px solid #22c55e; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            
            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #22c55e;">Contact Details</h3>
              <p><strong>Name:</strong> ${sanitizedName}</p>
              <p><strong>Email:</strong> ${sanitizedEmail}</p>
              <p><strong>Project Type:</strong> ${sanitizedProject}</p>
            </div>
            
            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #22c55e;">Message</h3>
              <p style="white-space: pre-wrap; line-height: 1.6;">${sanitizedMessage}</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding: 20px; background: #22c55e; color: white; border-radius: 8px;">
              <p style="margin: 0; font-weight: bold;">New business opportunity! 🚀</p>
            </div>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
            <p style="color: #888; font-size: 12px; text-align: center;">
              This email was sent from your Stackwise contact form at ${new Date().toLocaleString()}
            </p>
          </div>
        `,
        text: `
New Contact Form Submission

Name: ${sanitizedName}
Email: ${sanitizedEmail}
Project Type: ${sanitizedProject}

Message:
${sanitizedMessage}

Sent at: ${new Date().toLocaleString()}
        `.trim(),
      });
      
      console.log("Notification email sent successfully:", notificationResponse.data?.id);
    } catch (emailError) {
      console.error("Error sending notification email:", emailError);
      return new Response(
        JSON.stringify({ 
          error: "Failed to send notification email",
          success: false,
          details: emailError instanceof Error ? emailError.message : String(emailError)
        }),
        {
          status: 500,
          headers: { 
            "Content-Type": "application/json", 
            ...corsHeaders 
          },
        }
      );
    }

    // Check if notification email failed
    if (notificationResponse.error) {
      console.error("Notification email failed:", notificationResponse.error);
      return new Response(
        JSON.stringify({ 
          error: `Failed to send notification email: ${notificationResponse.error.message}`,
          success: false,
          errorDetails: notificationResponse.error
        }),
        {
          status: 500,
          headers: { 
            "Content-Type": "application/json", 
            ...corsHeaders 
          },
        }
      );
    }

    // Send confirmation email to the user
    console.log("Attempting to send confirmation email...");
    let confirmationResponse;
    try {
      confirmationResponse = await resend.emails.send({
        from: "Stackwise <onboarding@resend.dev>",
        to: [email],
        subject: "Thank you for contacting Stackwise!",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #22c55e; margin: 0;">Stackwise</h1>
            </div>
            
            <h2 style="color: #333; border-bottom: 2px solid #22c55e; padding-bottom: 10px;">
              Thank you for reaching out, ${sanitizedName}!
            </h2>
            
            <p style="font-size: 16px; line-height: 1.6; color: #555;">
              We've received your message and our team will get back to you within 24 hours.
            </p>
            
            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #22c55e;">What happens next?</h3>
              <ul style="color: #555; line-height: 1.8;">
                <li>Our team will review your project requirements</li>
                <li>We'll prepare a customized proposal for you</li>
                <li>You'll receive a detailed response within 24 hours</li>
                <li>We can schedule a call to discuss your vision</li>
              </ul>
            </div>
            
            <div style="background: #22c55e; color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Your submission details:</h3>
              <p><strong>Project Type:</strong> ${sanitizedProject}</p>
              <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #888; font-size: 14px;">
                Best regards,<br>
                <strong style="color: #22c55e;">The Stackwise Team</strong>
              </p>
            </div>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
            <p style="color: #888; font-size: 12px; text-align: center;">
              If you have any urgent questions, please reply to this email.
            </p>
          </div>
        `,
        text: `
Thank you for reaching out, ${sanitizedName}!

We've received your message and our team will get back to you within 24 hours.

What happens next?
- Our team will review your project requirements
- We'll prepare a customized proposal for you
- You'll receive a detailed response within 24 hours
- We can schedule a call to discuss your vision

Your submission details:
Project Type: ${sanitizedProject}
Submitted: ${new Date().toLocaleString()}

Best regards,
The Stackwise Team

If you have any urgent questions, please reply to this email.
        `.trim(),
      });
      
      console.log("Confirmation email sent successfully:", confirmationResponse.data?.id);
    } catch (emailError) {
      console.error("Error sending confirmation email:", emailError);
      // Don't fail the whole request if confirmation fails - notification is more important
      confirmationResponse = { error: { message: emailError instanceof Error ? emailError.message : String(emailError) } };
    }

    // Prepare final response
    const result = {
      success: true,
      message: "Emails processed successfully",
      notificationId: notificationResponse.data?.id,
      confirmationId: confirmationResponse?.data?.id || null,
      timestamp: new Date().toISOString()
    };

    if (confirmationResponse?.error) {
      console.warn("Confirmation email failed:", confirmationResponse.error);
      result.message = "Notification sent successfully, but confirmation email failed";
      // @ts-ignore - adding warning field
      result.warning = `Confirmation email failed: ${confirmationResponse.error.message}`;
    }

    console.log("Final response:", result);
    
    return new Response(
      JSON.stringify(result),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );

  } catch (error: any) {
    console.error("Unexpected error in handler:", error);
    console.error("Error stack:", error.stack);
    
    return new Response(
      JSON.stringify({ 
        error: error.message || "Unknown error occurred",
        success: false,
        type: error.constructor.name,
        timestamp: new Date().toISOString()
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

console.log("Starting email service...");
console.log("Environment check:", {
  hasApiKey: !!Deno.env.get("RESEND_API_KEY"),
  denoVersion: Deno.version.deno,
  timestamp: new Date().toISOString()
});

serve(handler, { port: 8000 });