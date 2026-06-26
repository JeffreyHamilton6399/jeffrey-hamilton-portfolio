"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { profile } from "@/lib/portfolio-data";
import { SectionHeading } from "./section-heading";

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/[^0-9+]/g, "")}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: profile.location,
    href: undefined,
  },
];

export function Contact() {
  const [submitting, setSubmitting] = React.useState(false);
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange =
    (key: keyof typeof form) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        toast.error(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      toast.success(data.message ?? "Message sent!");
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      id="contact"
      className="scroll-mt-20 bg-gradient-to-b from-background to-amber-50/50 py-20 dark:to-amber-950/10 sm:py-24"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Get in touch"
          title="Let's work together"
          description="Have a role, opportunity, or just want to say hello? Send me a message and I'll get back to you."
        />

        <div className="mt-12 grid gap-8 md:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-4"
          >
            {contactItems.map((item) => {
              const inner = (
                <Card className="flex items-center gap-4 border-border/60 shadow-sm transition-shadow hover:shadow-md">
                  <CardContent className="flex items-center gap-4 p-4 sm:p-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="truncate text-sm font-semibold">
                        {item.value}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="block"
                  aria-label={`${item.label}: ${item.value}`}
                >
                  {inner}
                </a>
              ) : (
                <div key={item.label}>{inner}</div>
              );
            })}

            <Card className="mt-2 border-border/60 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20">
              <CardContent className="p-5">
                <p className="text-sm leading-relaxed text-foreground/80">
                  Prefer email? Reach out directly and I usually reply within a
                  day. I&apos;m currently open to{" "}
                  <span className="font-semibold text-foreground">
                    full-time and part-time
                  </span>{" "}
                  opportunities.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
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
                        onChange={handleChange("name")}
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
                        onChange={handleChange("email")}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell me a bit about the opportunity or what you'd like to discuss..."
                      rows={5}
                      value={form.message}
                      onChange={handleChange("message")}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={submitting}
                    className="bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md hover:from-amber-600 hover:to-orange-700"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send message
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
