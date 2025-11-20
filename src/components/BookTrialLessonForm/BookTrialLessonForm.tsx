import type { FieldConfig } from "../AuthForm/AuthForm";
import AuthForm from "../AuthForm/AuthForm";
import { sendTrialRequest } from "../service/sendTrialRequest";
import TeacherInfo from "../TeacherCard/TeacherInfo/TeacherInfo";
import { TrialData, trialSchema } from "../validation/validation";
import { useAuthStore } from "../zustand/stores/authStore";
import { useModalStore } from "../zustand/stores/modalStore";
import css from "./BookTrialLessonForm.module.css";

const fields: FieldConfig<TrialData>[] = [
  {
    name: "reason",
    type: "radio",
    placeholder: "What is your main reason for learning English?",
    options: [
      { label: "Career and business", value: "work" },
      { label: "Lesson for kids", value: "kids" },
      { label: "Living abroad", value: "abroad" },
      { label: "Exams and coursework", value: "Exams" },
      { label: "Culture, travel or hobby", value: "Culture" },
    ],
  },
  { name: "FullName", type: "text", placeholder: "Full Name" },
  { name: "email", type: "email", placeholder: "Email" },
  { name: "PhoneNumber", type: "text", placeholder: "Phone number" },
];

export default function BookTrialLessonForm() {
  const { setModalType, closeModal, selectedTeacher } = useModalStore();
  const user = useAuthStore((state) => state.user);

  if (user === null) {
    setModalType("authRequired");
    return;
  }

  return (
    <AuthForm
      className={css.trialForm}
      sendToBackend={sendTrialRequest}
      schema={trialSchema}
      titleForm={"Book trial lesson"}
      textForm={
        "Our experienced tutor will assess your current language level, discuss your learning goals, and tailor the lesson to your specific needs."
      }
      otherContent1={
        <TeacherInfo className={css.teacherInfo} teacher={selectedTeacher} />
      }
      btnLabel={"Book"}
      successMessage={(user) =>
        `Thanks for trial lesson ${
          user.displayName ?? "user"
        }! Your teacher contacts for your`
      }
      onSuccess={(user) => {
        closeModal();
      }}
      fields={fields}
    />
  );
}
