import FormButton from "@/components/form-btn";

export default function EditUserProfile() {
  return (
    <div className="container-basic mb-20 *:w-full">
      <h2 className="mb-5 text-lg font-bold text-white">프로필 편집</h2>
      <section className="mb-10 mb:grid grid-flow-col items-center">
        <form>
          <FormButton text="프로필 수정" />
        </form>
      </section>
    </div>
  );
}
