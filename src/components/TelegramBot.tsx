import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";

interface IformTelegram {
  userName: string;
  email: string;
  subject: string;
  description: string;
}

const TOKEN = import.meta.env.VITE_TG_TOKEN;
const CHAT_ID = import.meta.env.VITE_TG_CHAT_ID;

export default function TelegramBot() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<IformTelegram>();

  const messageModel = (data: IformTelegram) => {
    let messageTg = `UserName:<b>${data.userName} </b> \n`;
    messageTg += `Email Addres:<b>${data.email} </b> \n`;
    messageTg += `Subject:<b>${data.subject} </b> \n`;
    messageTg += `Description:<b>${data.description} </b> \n`;
    return messageTg;
  };
  //   \n -означает новая строка

  const onSubmit: SubmitHandler<IformTelegram> = async (data) => {
    await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      parse_mode: "html",
      text: messageModel(data),
    });
    reset();
  };

  return (
    <div>
      <h1>Telegram bot</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="userName"
          {...register("userName", { required: true })}
        />
        <input
          type="text"
          placeholder="email"
          {...register("email", {
            required: true,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          })}
        />
        <input
          type="text"
          placeholder="subject"
          {...register("subject", { required: true })}
        />{" "}
        <input
          type="text"
          placeholder="description"
          {...register("description", { required: true })}
        />
        {isSubmitting ? (
          <button type="submit">loading</button>
        ) : (
          <button type="submit">send</button>
        )}
      </form>
    </div>
  );
}
