"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
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
import { LoginSchema } from "@/schema/auth/LoginSchema";
import { EyeClosed, EyeIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { useLoginMutation } from "@/redux/query/auth";
import { useDispatch } from "react-redux";
import { saveAuthData } from "@/redux/features/auth/authSlice";
import { AppDispatch } from "@/redux/store";
import { toast } from "sonner";
import { formatCode } from "@/lib/utils";
import { ErrorResponse } from "react-router-dom";

const formSchema = LoginSchema;

export function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
    const [obscure, setObscure] = useState<boolean>(true);
    const [login, {isLoading}] = useLoginMutation();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {},
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        login(values).unwrap().then((response) => {
            console.log("Login successful:", response);
            toast(`Welcome back!`, {
                description: "You have successfully logged in.",
                duration: 3000,
                icon: "👋",
              });
            dispatch(saveAuthData(response));
        }).catch((error: ErrorResponse) => {
            toast.error(`${formatCode(error.data.code)}`)
        });
        console.log(values)
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-72">
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
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <div className="relative flex items-center">
                               <Button
                                 type="button"
                                 variant={"link"}
                                 className="absolute z-20 right-1"
                                 onClick={() => setObscure(!obscure)}
                               >
                                 {
                                    obscure ? (
                                      <EyeClosed className="h-4 w-4" />
                                    ) : (
                                      <EyeIcon className="h-4 w-4" />
                                    )
                                 }
                               </Button>
                                <Input type={obscure ? "password" : "text"} {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button disabled={isLoading} className="w-full" type="submit">
                  {
                    isLoading ? (
                      <span className="ml-2 animate-spin"><Loader2/></span>
                    ) : (
                      <span className="ml-2">Login</span>
                    )
                  }
                </Button>
            </form>
        </Form>
    )
}
