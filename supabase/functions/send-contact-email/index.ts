import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  project: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, project, message }: ContactEmailRequest = await req.json();

    console.log("Sending email with data:", { name, email, project, message });

    // Send notification email to Stackwise
    const notificationResponse = await resend.emails.send({
      from: "Stackwise Contact Form <onboarding@resend.dev>",
      to: ["stackwise7@gmail.com"],
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #22c55e; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #22c55e;">Contact Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Project Type:</strong> ${project || 'Not specified'}</p>
          </div>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #22c55e;">Message</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding: 20px; background: #22c55e; color: white; border-radius: 8px;">
            <p style="margin: 0; font-weight: bold;">New business opportunity! 🚀</p>
          </div>
        </div>
      `,
    });

    // Send confirmation email to the user
    const confirmationResponse = await resend.emails.send({
      from: "Stackwise <onboarding@resend.dev>",
      to: [email],
      subject: "Thank you for contacting Stackwise!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #22c55e; padding-bottom: 10px;">
            Thank you for reaching out, ${name}!
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
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #888; font-size: 14px;">
              Best regards,<br>
              <strong style="color: #22c55e;">The Stackwise Team</strong>
            </p>
          </div>
        </div>
      `,
    });

    console.log("Notification email sent:", notificationResponse);
    console.log("Confirmation email sent:", confirmationResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Emails sent successfully",
        notificationId: notificationResponse.data?.id,
        confirmationId: confirmationResponse.data?.id
      }), 
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
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
};

serve(handler);