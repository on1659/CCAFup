import Link from "next/link";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-20">
      <div className="text-center">
        <FileQuestion className="mx-auto mb-4 h-12 w-12 text-hint" />
        <h1 className="text-h1 text-heading mb-2">404</h1>
        <p className="text-body text-sub mb-6">
          페이지를 찾을 수 없습니다.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-small font-medium text-white hover:bg-primary-hover transition-colors"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </main>
  );
}
