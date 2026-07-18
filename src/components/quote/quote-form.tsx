"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  CheckmarkCircle02Icon,
  DeliveryTruck01Icon,
  Location01Icon,
  Mail01Icon,
} from "@hugeicons/core-free-icons";
import { AnimatePresence, motion } from "motion/react";

import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const steps = [
  { label: "Location", icon: Location01Icon },
  { label: "Vehicle details", icon: DeliveryTruck01Icon },
  { label: "Company details", icon: Mail01Icon },
];

const inputStyles =
  "w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition-all duration-300 focus:border-brand/50 focus:bg-white focus:shadow-md focus:shadow-brand/[0.06]";

function Field({
  label,
  required = false,
  children,
  className,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-xs font-semibold text-neutral-700">
        {label}
        {required && <span className="ml-0.5 text-brand">*</span>}
      </span>
      {children}
    </label>
  );
}

/** Pill group where exactly one option is choosable. */
function ChoiceGroup({
  label,
  required = false,
  options,
  value,
  onChange,
  className,
}: {
  label: string;
  required?: boolean;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  return (
    <div className={className}>
      <span className="mb-1.5 block text-xs font-semibold text-neutral-700">
        {label}
        {required && <span className="ml-0.5 text-brand">*</span>}
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = value === option;
          return (
            <motion.button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className={cn(
                "cursor-pointer rounded-full border px-4.5 py-2 text-sm font-medium transition-all duration-300",
                selected
                  ? "border-brand bg-brand text-white shadow-md shadow-brand/25"
                  : "border-neutral-200 bg-neutral-50 text-neutral-600 hover:border-neutral-300 hover:bg-white",
              )}
            >
              {option}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

/** Animated step rail across the top of the form. */
function StepRail({ current }: { current: number }) {
  return (
    <div className="flex items-center">
      {steps.map((step, i) => {
        const done = i < current;
        const activeStep = i === current;
        return (
          <div
            key={step.label}
            className={cn("flex items-center", i > 0 && "flex-1")}
          >
            {i > 0 && (
              <div className="relative mx-3 h-0.5 flex-1 overflow-hidden rounded-full bg-neutral-200">
                <motion.div
                  animate={{ scaleX: i <= current ? 1 : 0 }}
                  transition={{ duration: 0.5, ease }}
                  className="absolute inset-0 origin-left bg-brand"
                />
              </div>
            )}
            <div className="flex items-center gap-2.5">
              <motion.span
                animate={{
                  scale: activeStep ? 1.08 : 1,
                  backgroundColor:
                    done || activeStep ? "var(--brand)" : "#f5f5f5",
                }}
                transition={{ duration: 0.35, ease }}
                className={cn(
                  "grid size-10 shrink-0 place-items-center rounded-full border text-sm transition-colors duration-300",
                  done || activeStep
                    ? "border-brand text-white shadow-md shadow-brand/25"
                    : "border-neutral-200 text-neutral-400",
                )}
              >
                {done ? (
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} size={18} />
                ) : (
                  <HugeiconsIcon icon={step.icon} size={18} />
                )}
              </motion.span>
              <div className="hidden sm:block">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                  Step {i + 1}
                </p>
                <p
                  className={cn(
                    "text-sm font-semibold transition-colors duration-300",
                    activeStep ? "text-neutral-900" : "text-neutral-500",
                  )}
                >
                  {step.label}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const stepVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 56 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -56 }),
};

const initialFields = {
  startCountry: "",
  endCountry: "",
  startCity: "",
  endCity: "",
  vehicleType: "",
  model: "",
  year: "",
  quantity: "",
  length: "",
  width: "",
  height: "",
  weight: "",
  pickupAddress: "",
  deliveryAddress: "",
  insuranceValue: "",
  remarks: "",
  companyName: "",
  companyLocation: "",
  contactPerson: "",
  contactNo: "",
  companyEmail: "",
};

type Fields = typeof initialFields;

export function QuoteForm() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Free-text fields, lifted so values survive step changes (each step
  // unmounts the previous one inside AnimatePresence).
  const [fields, setFields] = useState<Fields>(initialFields);
  const setField = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields((f) => ({ ...f, [key]: e.target.value }));

  // Single-choice selections (step 2)
  const [transportMode, setTransportMode] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [condition, setCondition] = useState("");
  const [doorToDoor, setDoorToDoor] = useState("");
  const [marineInsurance, setMarineInsurance] = useState("");
  const [choiceError, setChoiceError] = useState(false);

  const goTo = (next: number) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
    setChoiceError(false);
  };

  const handleStepSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step === 1) {
      // Pill groups aren't native inputs — validate them explicitly
      if (!transportMode || !fuelType || !condition || !doorToDoor || !marineInsurance) {
        setChoiceError(true);
        return;
      }
    }
    if (step < steps.length - 1) {
      goTo(step + 1);
      return;
    }

    setSubmitError("");
    setSubmitting(true);
    try {
      const res = await fetch("/send-quote.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fields,
          transportMode,
          fuelType,
          condition,
          doorToDoor,
          marineInsurance,
        }),
      });
      if (!res.ok) throw new Error("request-failed");
      setSubmitted(true);
    } catch {
      setSubmitError(
        `Something went wrong sending your request. Please email us directly at ${site.email}.`,
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      {submitted ? (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, ease }}
          className="flex flex-col items-center rounded-[2rem] border border-neutral-200 bg-white p-12 text-center shadow-xl shadow-neutral-200/60"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.15 }}
            className="grid size-20 place-items-center rounded-full bg-brand/10 text-brand"
          >
            <HugeiconsIcon icon={CheckmarkCircle02Icon} size={40} />
          </motion.span>
          <h2 className="mt-6 font-heading text-3xl font-extrabold text-neutral-900">
            Quote request sent
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-600">
            The ALN member responsible for your route will come back with a
            competitive freight quote shortly. For anything urgent, email{" "}
            <a href={`mailto:${site.email}`} className="font-semibold text-brand">
              {site.email}
            </a>
            .
          </p>
          <a
            href="/"
            className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-neutral-700 transition-colors hover:text-brand"
          >
            Back to home
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
            </span>
          </a>
        </motion.div>
      ) : (
        <div className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-xl shadow-neutral-200/60 sm:p-10">
          <StepRail current={step} />

          <form onSubmit={handleStepSubmit} className="mt-10">
            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.div
                  key={step}
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease }}
                >
                  {step === 0 && (
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Start location (country)" required>
                        <input
                          required
                          placeholder="e.g. Japan"
                          className={inputStyles}
                          value={fields.startCountry}
                          onChange={setField("startCountry")}
                        />
                      </Field>
                      <Field label="End location (country)" required>
                        <input
                          required
                          placeholder="e.g. Sri Lanka"
                          className={inputStyles}
                          value={fields.endCountry}
                          onChange={setField("endCountry")}
                        />
                      </Field>
                      <Field label="City (start)" required>
                        <input
                          required
                          placeholder="Enter start city name"
                          className={inputStyles}
                          value={fields.startCity}
                          onChange={setField("startCity")}
                        />
                      </Field>
                      <Field label="City (end)" required>
                        <input
                          required
                          placeholder="Enter end city name"
                          className={inputStyles}
                          value={fields.endCity}
                          onChange={setField("endCity")}
                        />
                      </Field>
                    </div>
                  )}

                  {step === 1 && (
                    <div className="flex flex-col gap-6">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field label="Vehicle type" required>
                          <input
                            required
                            placeholder="e.g. SUV, sedan, excavator"
                            className={inputStyles}
                            value={fields.vehicleType}
                            onChange={setField("vehicleType")}
                          />
                        </Field>
                        <Field label="Model" required>
                          <input
                            required
                            placeholder="e.g. Toyota Land Cruiser"
                            className={inputStyles}
                            value={fields.model}
                            onChange={setField("model")}
                          />
                        </Field>
                        <Field label="Manufactured year" required>
                          <input
                            required
                            type="number"
                            min={1900}
                            max={2100}
                            placeholder="e.g. 2022"
                            className={inputStyles}
                            value={fields.year}
                            onChange={setField("year")}
                          />
                        </Field>
                        <Field label="Number of vehicles" required>
                          <input
                            required
                            type="number"
                            min={1}
                            placeholder="e.g. 1"
                            className={inputStyles}
                            value={fields.quantity}
                            onChange={setField("quantity")}
                          />
                        </Field>
                      </div>

                      <div className="grid gap-6 sm:grid-cols-2">
                        <ChoiceGroup
                          label="Fuel type"
                          required
                          options={["Gasoline", "Electric", "Hybrid"]}
                          value={fuelType}
                          onChange={setFuelType}
                        />
                        <ChoiceGroup
                          label="Condition"
                          required
                          options={["Brand new", "Used"]}
                          value={condition}
                          onChange={setCondition}
                        />
                      </div>

                      <ChoiceGroup
                        label="Transport mode"
                        required
                        options={["Sea", "Air", "Land", "Rail"]}
                        value={transportMode}
                        onChange={setTransportMode}
                      />

                      <div>
                        <span className="mb-1.5 block text-xs font-semibold text-neutral-700">
                          Dimensions
                        </span>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                          {(
                            [
                              { key: "length", label: "Length" },
                              { key: "width", label: "Width" },
                              { key: "height", label: "Height" },
                              { key: "weight", label: "Weight" },
                            ] as const
                          ).map((d) => (
                            <input
                              key={d.key}
                              placeholder={d.label}
                              className={inputStyles}
                              value={fields[d.key]}
                              onChange={setField(d.key)}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="grid gap-6 sm:grid-cols-2">
                        <ChoiceGroup
                          label="Door to door service"
                          required
                          options={["Yes", "No"]}
                          value={doorToDoor}
                          onChange={setDoorToDoor}
                        />
                        <ChoiceGroup
                          label="Need marine insurance"
                          required
                          options={["Yes", "No"]}
                          value={marineInsurance}
                          onChange={setMarineInsurance}
                        />
                      </div>

                      {/* Conditional fields unfold smoothly */}
                      <AnimatePresence initial={false}>
                        {doorToDoor === "Yes" && (
                          <motion.div
                            key="addresses"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease }}
                            className="overflow-hidden"
                          >
                            <div className="grid gap-5 sm:grid-cols-2">
                              <Field label="Pickup address" required>
                                <input
                                  required
                                  placeholder="Pickup address"
                                  className={inputStyles}
                                  value={fields.pickupAddress}
                                  onChange={setField("pickupAddress")}
                                />
                              </Field>
                              <Field label="Delivery address" required>
                                <input
                                  required
                                  placeholder="Delivery address"
                                  className={inputStyles}
                                  value={fields.deliveryAddress}
                                  onChange={setField("deliveryAddress")}
                                />
                              </Field>
                            </div>
                          </motion.div>
                        )}
                        {marineInsurance === "Yes" && (
                          <motion.div
                            key="insurance"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease }}
                            className="overflow-hidden"
                          >
                            <Field label="Value of the vehicle (USD)" required>
                              <input
                                required
                                type="number"
                                min={0}
                                placeholder="What is the C & F value of the vehicle in USD"
                                className={inputStyles}
                                value={fields.insuranceValue}
                                onChange={setField("insuranceValue")}
                              />
                            </Field>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <Field label="Instructions / remarks">
                        <textarea
                          rows={3}
                          placeholder="Special instructions and remarks"
                          className={cn(inputStyles, "resize-none")}
                          value={fields.remarks}
                          onChange={setField("remarks")}
                        />
                      </Field>

                      <AnimatePresence>
                        {choiceError && (
                          <motion.p
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-sm font-medium text-brand"
                          >
                            Please make a selection for every choice above.
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Company name" required className="sm:col-span-2">
                        <input
                          required
                          placeholder="Company name"
                          className={inputStyles}
                          value={fields.companyName}
                          onChange={setField("companyName")}
                        />
                      </Field>
                      <Field label="City / country / region" required>
                        <input
                          required
                          placeholder="City/Country/Region"
                          className={inputStyles}
                          value={fields.companyLocation}
                          onChange={setField("companyLocation")}
                        />
                      </Field>
                      <Field label="Contact person" required>
                        <input
                          required
                          placeholder="Name of the contact person"
                          className={inputStyles}
                          value={fields.contactPerson}
                          onChange={setField("contactPerson")}
                        />
                      </Field>
                      <Field label="Contact no" required>
                        <input
                          required
                          type="tel"
                          placeholder="Contact no"
                          className={inputStyles}
                          value={fields.contactNo}
                          onChange={setField("contactNo")}
                        />
                      </Field>
                      <Field label="Company email" required>
                        <input
                          required
                          type="email"
                          placeholder="Company email"
                          className={inputStyles}
                          value={fields.companyEmail}
                          onChange={setField("companyEmail")}
                        />
                      </Field>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="mt-10 flex items-center justify-between gap-4">
              {step > 0 ? (
                <motion.button
                  type="button"
                  onClick={() => goTo(step - 1)}
                  whileHover={{ scale: 1.03, x: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 320, damping: 20 }}
                  className="group flex h-12 cursor-pointer items-center gap-2 rounded-full border border-neutral-200 bg-white px-6 text-sm font-semibold text-neutral-700 transition-colors duration-300 hover:border-neutral-300 hover:text-neutral-900"
                >
                  <span className="transition-transform duration-300 group-hover:-translate-x-1">
                    <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
                  </span>
                  Back
                </motion.button>
              ) : (
                <span />
              )}

              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={submitting ? undefined : { scale: 1.03, y: -2 }}
                whileTap={submitting ? undefined : { scale: 0.97 }}
                transition={{ type: "spring", stiffness: 320, damping: 20 }}
                className="group flex h-12 cursor-pointer items-center gap-2 rounded-full bg-brand px-8 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition-shadow duration-300 hover:shadow-xl hover:shadow-brand/30 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting
                  ? "Sending..."
                  : step === steps.length - 1
                    ? "Submit request"
                    : "Next step"}
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
                </span>
              </motion.button>
            </div>

            <AnimatePresence>
              {submitError && (
                <motion.p
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 text-sm font-medium text-brand"
                >
                  {submitError}
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </div>
      )}
    </div>
  );
}

export function QuoteHeader() {
  return (
    <section className="bg-white pt-36 text-black sm:pt-44">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="flex items-center justify-center gap-2 text-xs font-medium text-neutral-400">
          <a href="/" className="transition-colors hover:text-brand">
            Home
          </a>
          <span>/</span>
          <a href="/services" className="transition-colors hover:text-brand">
            Service &amp; Quote
          </a>
          <span>/</span>
          <span className="text-neutral-700">Get a quote</span>
        </Reveal>
        <div className="mx-auto mt-6 max-w-2xl text-center">
          <Reveal delay={0.05} className="flex justify-center">
            <Eyebrow>Get a quote</Eyebrow>
          </Reveal>
          <TextReveal
            as="h1"
            text="Your freight quote in three quick steps"
            highlight={["three", "steps"]}
            className="mt-5 font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-neutral-900 text-balance sm:text-5xl"
          />
          <Reveal delay={0.15}>
            <p className="mt-5 text-base leading-relaxed text-neutral-600">
              Get your freight quotation to transport your vehicle or vehicles
              worldwide by sea, air, land or rail — fill this form and we&apos;ll
              send you quick freight quotes.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
