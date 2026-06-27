"use client";

import * as React from "react";
import { Send, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { profile } from "@/lib/portfolio-data";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

export function Contact() {
  const [sending, setSending] = React.useState(false);
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    message: "",
  });

  const update =
    (key: keyof typeof form) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in your name, email, and a message.");
      return;
    }

    setSending(true);
    const subject = `Portfolio Contact: ${form.name}`;
    const body = `${form.message}\n\n— ${form.name}\n${form.email}`;
    const href = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setTimeout(() => {
      window.location.href = href;
      setSending(false);
      toast.success("Opening your email client…", {
        description: "If nothing happened, email me directly at " + profile.email,
      });
      setForm({ name: "", email: "", message: "" });
    }, 600);
  }

  return (
    <section id="contact" className="scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Contact"
          title="Get in touch."
          description="Have a project, an opportunity, or just want to say something? Send it."
        />

        <Reveal delay={0.1}>
          <Card className="mx-auto mt-12 max-w-[560px] border-border/60 shadow-sm">
            <CardContent className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      autoComplete="name"
                      value={form.name}
                      onChange={update("name")}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      value={form.email}
                      onChange={update("email")}
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="What's on your mind?"
                    rows={5}
                    value={form.message}
                    onChange={update("message")}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  disabled={sending}
                  className="btn-press bg-amber-500 text-white shadow-md transition-shadow hover:bg-amber-600 hover:shadow-lg hover:shadow-amber-500/25"
                >
                  {sending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Opening mail…
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  This opens your email app. No data is stored anywhere.
                </p>
              </form>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
