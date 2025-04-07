"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormSignaturePad,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "이름은 두 글자 이상으로 입력해주세요.",
  }),
  studentId: z.string().length(8, {
    message: "학번을 확인해주세요.",
  }),
  department: z.string().min(1, {
    message: "학부를 확인해주세요.",
  }),
  signature: z.string().min(1, {
    message: "서명을 입력해주세요.",
  }),
  termAgree: z.boolean().refine((val) => val, {
    message: "이용약관에 동의해주세요.",
  }),
  privacyAgree: z.boolean().refine((val) => val, {
    message: "개인정보 수집에 동의해주세요.",
  }),
});

export default function SignatureForm() {
  const { push } = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      studentId: "",
      department: "",
      termAgree: false,
      privacyAgree: false,
    },
  });

  const watch = form.watch();

  const isSubmitDisabled =
    !watch.name ||
    watch.name.length < 2 ||
    !watch.studentId ||
    watch.studentId.length !== 8 ||
    !watch.department ||
    !watch.signature ||
    !watch.termAgree ||
    !watch.privacyAgree;

  function dataURLtoFile(dataurl: string, filename: string): File {
    const arr = dataurl.split(",");
    const mimeMatch = arr[0].match(/:(.*?);/);
    if (!mimeMatch) throw new Error("Invalid data URL");
    const mime = mimeMatch[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, studentId, department, signature } = values;

    const response = await fetch("/signature", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        studentId,
        department,
        signatureBase64: signature,
        timestamp: new Date().toISOString(),
      }),
    });

    const data = await response.json();

    if (data.status === 201) {
      alert("서명이 정상적으로 등록되었습니다!");
      form.reset();
      push("/");
    } else if (data.status === 400) {
      if (data.message === "이미 해당 학번으로 서명이 등록되어 있습니다.") {
        alert("이미 서명하셨습니다! 중복 서명은 불가능합니다.");
      } else {
        alert("오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto w-full max-w-3xl space-y-8"
          >
            {/* 이름 */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이름</FormLabel>
                  <FormControl>
                    <Input placeholder="홍길동" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 학번 */}
            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>학번</FormLabel>
                  <FormControl>
                    <Input placeholder="20000000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 학부 */}
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>학부</FormLabel>
                  <FormControl>
                    <Input placeholder="예: 소프트웨어학부" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 서명 */}
            <FormField
              control={form.control}
              name="signature"
              render={() => (
                <FormItem>
                  <FormLabel>서명</FormLabel>
                  <FormControl>
                    <FormSignaturePad />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 이용약관 동의 */}
            <FormField
              control={form.control}
              name="termAgree"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <div className="text-sm font-medium leading-none">
                        <label htmlFor="terms" className="cursor-pointer">
                          <a
                            href="https://simulatedfinancialinvestment.notion.site/1cd5fa1245d58017a7e7c561999e694a"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline text-blue-600 hover:text-blue-800"
                          >
                            이용 약관
                          </a>
                          에 동의합니다.
                        </label>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 개인정보 수집 동의 */}
            <FormField
              control={form.control}
              name="privacyAgree"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="privacy"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <label
                        htmlFor="privacy"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        본인은 개인정보의 수집 및 이용, 제3자 제공에 관한 사항을
                        모두 확인하였으며 이에 동의합니다.
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 제출 버튼 */}
            <div className="flex gap-3">
              <Button
                variant="default"
                className="flex-1"
                type="submit"
                disabled={isSubmitDisabled}
              >
                제출 하기
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link href="/">메인 화면으로</Link>
              </Button>
            </div>
          </form>
        </Form>
      </main>
    </div>
  );
}
