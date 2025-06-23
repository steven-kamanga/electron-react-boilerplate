"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import type { z } from "zod";
import {
    BusinessSchema,
    BasicBusinessSchema,
    AdvancedBusinessSchema
} from "../../schema/business/BusinessSchema";
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

type BasicFormData = z.infer<typeof BasicBusinessSchema>;
type AdvancedFormData = z.infer<typeof AdvancedBusinessSchema>;
type CompleteFormData = z.infer<typeof BusinessSchema>;

export function BusinessForm() {
    const [currentStep, setCurrentStep] = useState(1);
    const [basicData, setBasicData] = useState<BasicFormData | null>(null);

    const basicForm = useForm<BasicFormData>({
        resolver: zodResolver(BasicBusinessSchema),
        defaultValues: {
            businessName: "",
            businessResidence: "",
            businessEmail: "",
            businessPhoneNumber: "",
            annualIncome: 0,
            numberOfEmployees: 0,
        },
    });

    const advancedForm = useForm<AdvancedFormData>({
        resolver: zodResolver(AdvancedBusinessSchema),
        defaultValues: {
            tin: "",
            businessWeb: "",
            businessVatNumber: "",
            businessRegistrationCertificate: "",
        },
    });

    const handleStepOneSubmit = (values: BasicFormData) => {
        console.log("Step 1 data:", values);
        setBasicData(values);
        setCurrentStep(2);
    };

    const handleFinalSubmit = (values: AdvancedFormData) => {
        if (basicData) {
            // const completeData: CompleteFormData = { ...basicData, ...values };
            // console.log("Complete business registration data:", completeData);
            // Handle final submission here
            // alert("Registration completed successfully!");
            // Reset forms after successful submission if needed
            // basicForm.reset();
            // advancedForm.reset();
            // setBasicData(null);
            // setCurrentStep(1);
        }
    };

    const goBackToStepOne = () => {
        setCurrentStep(1);
        // The form should maintain its state naturally
    };

    const renderStepIndicator = () => (
        <div className="flex flex-col items-center justify-center mb-8">
            <div className="flex items-center">
                <div className={`flex items-center justify-center w-5 h-5 rounded-full border-2 transition-colors ${
                    currentStep === 1 ? 'bg-blue-600 border-blue-600 text-white' :
                    basicData ? 'bg-green-600 border-green-600 text-white' : 'border-gray-300 text-gray-300'
                }`}>
                    {basicData && currentStep === 2 ? '✓' : '1'}
                </div>
                <div className={`w-16 h-1 transition-colors ${
                    currentStep === 2 ? 'bg-blue-600' : 'bg-gray-300'
                }`}></div>
                <div className={`flex items-center justify-center w-5 h-5 rounded-full border-2 transition-colors ${
                    currentStep === 2 ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300 text-gray-300'
                }`}>
                    2
                </div>
            </div>
            <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                    Step {currentStep} of 2: {currentStep === 1 ? 'Basic Information' : 'Advanced Details'}
                </p>
            </div>
        </div>
    );

    const renderStepOne = () => (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Basic Business Information</h2>
                <p className="text-gray-600 mt-2">Let's start with the fundamental details about your business</p>
            </div>

            <Form {...basicForm}>
                <form onSubmit={basicForm.handleSubmit(handleStepOneSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={basicForm.control}
                            name="businessName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-gray-700">Business Name *</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Enter your business name"
                                            className="mt-1"
                                            disabled={false}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={basicForm.control}
                            name="businessResidence"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-gray-700">Business Address *</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Enter business address"
                                            className="mt-1"
                                            disabled={false}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={basicForm.control}
                            name="businessEmail"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-gray-700">Business Email *</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="email"
                                            placeholder="business@example.com"
                                            className="mt-1"
                                            disabled={false}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={basicForm.control}
                            name="businessPhoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-gray-700">Business Phone *</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="+1 (555) 123-4567"
                                            className="mt-1"
                                            disabled={false}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={basicForm.control}
                            name="annualIncome"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-gray-700">Annual Revenue *</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="0"
                                            className="mt-1"
                                            disabled={false}
                                            value={field.value || ""}
                                            onChange={(e) => {
                                                const value = e.target.value === "" ? 0 : Number(e.target.value);
                                                field.onChange(value);
                                            }}
                                            onBlur={field.onBlur}
                                            name={field.name}
                                            ref={field.ref}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={basicForm.control}
                            name="numberOfEmployees"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-gray-700">Number of Employees *</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="0"
                                            className="mt-1"
                                            disabled={false}
                                            value={field.value || ""}
                                            onChange={(e) => {
                                                const value = e.target.value === "" ? 0 : Number(e.target.value);
                                                field.onChange(value);
                                            }}
                                            onBlur={field.onBlur}
                                            name={field.name}
                                            ref={field.ref}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex justify-end pt-6 border-t">
                        <Button
                            type="submit"
                            className="px-8 py-2 bg-blue-600 hover:bg-blue-700 transition-colors"
                        >
                            Continue to Step 2 →
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );

    const renderStepTwo = () => (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Advanced Business Details</h2>
                <p className="text-gray-600 mt-2">
                    Please provide any additional business information you have available.
                    These fields are optional and can be updated later after you log in.
                </p>
            </div>

            <Form {...advancedForm}>
                <form onSubmit={advancedForm.handleSubmit(handleFinalSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={advancedForm.control}
                            name="tin"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-gray-700">Tax Identification Number (TIN)</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Enter your TIN number (optional)"
                                            className="mt-1"
                                            disabled={false}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={advancedForm.control}
                            name="businessWeb"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-gray-700">Business Website</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="https://yourwebsite.com (optional)"
                                            className="mt-1"
                                            disabled={false}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={advancedForm.control}
                            name="businessVatNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-gray-700">VAT Registration Number</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Enter your VAT number (optional)"
                                            className="mt-1"
                                            disabled={false}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={advancedForm.control}
                            name="businessRegistrationCertificate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-gray-700">Business Registration Certificate</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Enter certificate number (optional)"
                                            className="mt-1"
                                            disabled={false}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex justify-between pt-6 border-t">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={goBackToStepOne}
                            className="px-6 py-2 border-gray-300 hover:border-gray-400 transition-colors"
                        >
                            ← Back to Step 1
                        </Button>

                        <Button
                            type="submit"
                            className="px-8 py-2 bg-green-600 hover:bg-green-700 transition-colors"
                        >
                            Complete Registration ✓
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg">
            {renderStepIndicator()}

            <div className="mt-8">
                {currentStep === 1 && (
                    <div>
                        {renderStepOne()}
                    </div>
                )}
                {currentStep === 2 && (
                    <div>
                        {renderStepTwo()}
                    </div>
                )}
            </div>
        </div>
    );
}
