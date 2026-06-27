"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Send,
  Loader2,
  Github,
  Linkedin,
  Youtube,
  Coffee,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactSocials, profile } from "@/lib/portfolio-data";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

const socialIcons: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  youtube: Youtube,
  coffee: Coffee,
};

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

    // Small delay so the loading state is visible before the mail client opens.
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
    <section id="contact" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Let's talk."
          description="Whether it's a project, an opportunity, or just a conversation — I'm open to it."
        />

        <div className="mt-12 grid gap-8 md:grid-cols-[0.85fr_1.15fr]">
          {/* Left: details + socials */}
          <Reveal className="flex flex-col gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="group flex items-center gap-4 rounded-xl border border-border/60 bg-background p-4 shadow-sm transition-shadow hover:shadow-md hover:ring-1 hover:ring-amber-500/30 sm:p-5"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700 transition-transform group-hover:scale-110 dark:bg-amber-950/50 dark:text-amber-300">
                <Mail className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Email
                </p>
                <p className="truncate text-sm font-semibold">{profile.email}</p>
              </div>
            </a>

            <div className="flex items-center gap-4 rounded-xl border border-border/60 bg-background p-4 shadow-sm sm:p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground/70">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Based
                </p>
                <p className="text-sm font-semibold">{profile.location}</p>
              </div>
            </div>

            <div className="mt-1">
              <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Find me online
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                {contactSocials.map((s) => {
                  const Icon = socialIcons[s.key] ?? Mail;
                  return (
                    <a
                      key={s.key}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2.5 rounded-lg border border-border/60 bg-background px-3.5 py-2.5 text-sm font-medium shadow-sm transition-all hover:-translate-y-0.5 hover:border-amber-400 hover:shadow-md hover:ring-1 hover:ring-amber-500/30 dark:hover:border-amber-700"
                    >
                      <Icon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-amber-600" />
                      <span className="truncate">{s.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* Right: form */}
          <Reveal delay={0.1}>
            <Card className="border-border/60 shadow-sm">
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
      </div>
    </section>
  );
}
