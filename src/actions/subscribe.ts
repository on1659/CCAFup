"use server";

import { createClient } from "@/lib/supabase/server";

export async function subscribeEmail(formData: FormData) {
  const email = formData.get("email") as string;
  const locale = (formData.get("locale") as string) || "ko";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "올바른 이메일을 입력해주세요." };
  }

  try {
    const supabase = await createClient();

    const { error } = await supabase
      .from("subscribers")
      .upsert({ email, locale }, { onConflict: "email" });

    if (error) {
      console.error("Subscribe error:", error);
      return { error: "구독 처리 중 오류가 발생했습니다." };
    }

    return { success: true };
  } catch {
    return { error: "구독 처리 중 오류가 발생했습니다." };
  }
}
