interface FormButtonProps {
  loading: boolean;
  text: string;
}

//  폼 제출 시 "로딩 중" 메시지를 송출함과 동시에 button 비활성화
export default function FormButton({ loading, text }: FormButtonProps) {
  return (
    <button
      disabled={loading}
      className="primary-btn h-10 disabled:bg-neutral-400 disabled:text-neutral-300
      disabled:cursor-not-allowed"
    >
      {loading ? "로딩 중..." : text}
    </button>
  );
}
