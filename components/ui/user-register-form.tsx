"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { UserRegisterSchema } from "../../schema/auth/UserRegisterSchema";
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button"
import { ErrorResponse, useNavigate } from "react-router";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Countries } from "@/constants/Countries"
import { useFormPersistence } from "../../hooks/useFormPersistence";
import { ChevronRight, Loader2 } from "lucide-react";
import { useSignupMutation } from "@/redux/query/auth";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { saveAuthData } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";
import { formatCode } from "@/lib/utils";

const formSchema = UserRegisterSchema;

export function UserRegisterForm() {
  const dispatch = useDispatch<AppDispatch>();
   const navigate = useNavigate();
   const [register, { isLoading }] = useSignupMutation();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {},
    });

    const { clearForm } = useFormPersistence(form);

    const password = form.watch("password");
    const confirmPassword = form.watch("confirmPassword");
    const passwordsMatch = password === confirmPassword;

    function onSubmit(values: z.infer<typeof formSchema>) {
        register(values).unwrap()
            .then((response) => {
                dispatch(saveAuthData(response));
                toast(`User Created Successfully!, Now let's create your business profile 🤩`);
                setTimeout(() => {
                  navigate("/business");
                }, 1000);
            }).catch((error: ErrorResponse) => {
              toast.error(`${formatCode(error.data.code)}`)
            });
        clearForm();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 space-x-4 grid grid-cols-2">
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="countryOfResidence"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Country Of Residence</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a country" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {Countries.map((country) => (
                                      <SelectItem key={country.code} value={country.name}>
                                        {country.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription className="text-xs">
                              Add Country Code prefix
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="nationalId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>National Id</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription className="text-xs">
                              Entry your National ID or Passport Number
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Date of Birth</FormLabel>
                            <FormControl>
                                <Input {...field} type="date" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input {...field} type="password" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input {...field} type="password" />
                            </FormControl>
                            {confirmPassword && !passwordsMatch && (
                                <FormDescription className="text-red-500 text-xs">
                                    Passwords do not match
                                </FormDescription>
                            )}
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="col-span-2 flex flex-row justify-end" >
                  {
                    isLoading ? (
                        <div className="ml-2 animate-spin"><Loader2/></div>
                    ) : (
                      <Button className="w-full" type="submit">
                        <span className="ml-2">Create Account</span>
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    )
                  }
                </div>
            </form>
        </Form>
    )
}
