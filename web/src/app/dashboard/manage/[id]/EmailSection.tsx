"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Loader2 } from "lucide-react";
import emailTemplateData from "@/lib/utils/data/email-template.json";

interface EmailSectionProps {
  clientName: string;
  // Added optional props to accept AI draft data
  initialSubject?: string;
  initialBody?: string;
}

export default function EmailSection({ 
  clientName, 
  initialSubject = emailTemplateData.subject_line, // Default to JSON if no prop provided
  initialBody = emailTemplateData.email_body       // Default to JSON if no prop provided
}: EmailSectionProps) {
  
  // Initialize state with the passed props
  const [subject, setSubject] = useState(initialSubject);
  const [body, setBody] = useState(initialBody);
  
  const [recipientEmail, setRecipientEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSendEmail = async () => {
    if (!recipientEmail || !subject || !body) {
      setMessage({ type: "error", text: "Please fill in all fields" });
      return;
    }
    // const outlookDomains = [
    //   "outlook.com",
    //   "hotmail.com",
    //   "live.com",
    //   "msn.com",
    // ];
    
    // Safety check for domain (optional - remove if you want to allow all emails)
    // const emailDomain = recipientEmail.toLowerCase().split("@")[1];
    // if (!outlookDomains.includes(emailDomain)) {
    //   setMessage({
    //     type: "error",
    //     text: "Only Outlook/Hotmail/Live email addresses are allowed",
    //   });
    //   return;
    // }

    setIsSending(true);
    setMessage(null);

    const formattedBody = body.replace(/\n/g, '<br />');

    try {
      const response = await fetch("/api/outlook/emails/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: recipientEmail,
          subject,
          body: formattedBody,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage({ type: "success", text: "Email sent successfully!" });
      } else {
        setMessage({
          type: "error",
          text: data.error || "Failed to send email",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "An error occurred while sending email",
      });
      console.error("Send email error:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Card className="bg-white shadow-lg border border-slate-100 rounded-2xl h-full flex flex-col">
      <CardHeader className="border-b border-slate-100 shrink-0 pt-4">
        <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Send Email to {clientName}
        </CardTitle>
      </CardHeader>
      
      {/* Added flex-1 and overflow-y-auto to handle scrolling if content is long */}
      <CardContent className="px-6 pb-6 space-y-4 flex-1 overflow-y-auto">
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-800 font-semibold mb-1">
            Template Used
          </p>
          <p className="text-sm text-blue-900">
            {emailTemplateData.template_used}
          </p>
          {emailTemplateData.is_editable && (
            <p className="text-xs text-blue-600 mt-1">
              ✏️ This template is editable
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Recipient Email <span className="text-red-500">*</span>
          </label>
          <Input
            type="email"
            placeholder="client@outlook.com (Outlook emails only)"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            className="w-full"
          />
          {/* <p className="text-xs text-slate-500 mt-1">
            Only Outlook, Hotmail, Live, or MSN email addresses
          </p> */}
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Subject <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            placeholder="Email subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Email Body <span className="text-red-500">*</span>
          </label>
          <Textarea
            placeholder="Email content..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full min-h-[400px] font-mono text-sm leading-relaxed"
            rows={20}
          />
        </div>
        {message && (
          <div
            className={`p-3 rounded-lg text-sm font-semibold ${
              message.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {message.text}
          </div>
        )}
        <Button
          onClick={handleSendEmail}
          disabled={isSending}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-6 text-base"
        >
          {isSending ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Mail className="h-5 w-5 mr-2" />
              Send Email
            </>
          )}
        </Button>
        <p className="text-xs text-slate-500 text-center">
          This email will be sent from your connected Outlook account
        </p>
      </CardContent>
    </Card>
  );
}