"use client"

import {Button} from "@/components/ui/button";
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Checkbox} from "@/components/ui/checkbox";

const formSchema = z.object({
    name: z.string().min(2, {
        message: "이름은 두 글자 이상으로 입력해주세요.",
    }),
    studentId: z.string().length(8, {
        message: "학번을 확인해주세요.",
    }),
    department: z.string({
        message: "학부를 확인해주세요."
    }),
    termAgree: z.boolean(),
})

export default function SignatureForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            studentId: "",
            department: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <div
            className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto w-full max-w-3xl space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>이름</FormLabel>
                                    <FormControl>
                                        <Input placeholder="홍길동" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="studentId"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>학번</FormLabel>
                                    <FormControl>
                                        <Input placeholder="20000000" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="department"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>학부</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="termAgree"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="terms"
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                            <label
                                                htmlFor="terms"
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                이용 약관에 동의합니다.
                                            </label>
                                        </div>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button variant="outline" className="w-full" type="submit">제출하기</Button>
                    </form>
                </Form>
            </main>
        </div>
    );
}