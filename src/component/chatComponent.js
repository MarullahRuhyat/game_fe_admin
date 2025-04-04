import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import api_url from "@/api_url";

const ChatMessageRenderer = (chat, index) => {
  const textMessage = chat.data.text || "";
  const messageId = chat.data.id;
  const fromMe = chat.data.fromMe;
  const flex = fromMe ? "justify-end" : "";
  const background = fromMe ? "bg-blue-500" : "bg-gray-500";

  const messageType = chat.messageType;
  const filePath = chat.data.filePath || "";
  const filePathThumb = chat.data.filePathThumb || "";
  const url = chat.data.url || "";
  const fileName = chat.data.fileName || "";

  const time = chat.data.time;

  // Konversi timestamp ke milidetik (Unix timestamp biasanya dalam detik)
  const date = new Date(time * 1000);

  // Format tanggal dan waktu
  const formattedDate = `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(
    date.getHours()
  ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(
    date.getSeconds()
  ).padStart(2, "0")}`;

  switch (messageType) {
    case "imageMessage":
      return (
        <div className={`flex ${flex}`} id={messageId} key={index}>
          <div className="flex flex-col">
            <div className={`${background} p-2 rounded-lg my-2 max-w-xl`}>
              <div className="flex items-center">
                <img src={`${api_url.base_url}/${filePath}`} alt="" />
              </div>
              <div className="text-white">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {formatWhatsAppMarkdown(textMessage)}
                </ReactMarkdown>
              </div>
              <div className="text-gray-300 text-[12px]">{formattedDate}</div>
            </div>
          </div>
        </div>
      );

    case "videoMessage":
      return (
        <div className={`flex ${flex}`} id={messageId} key={index}>
          <div className="flex flex-col">
            <div className={`${background} p-2 rounded-lg my-2 max-w-xl`}>
              <video width="320" height="240" controls>
                <source
                  src={`${api_url.base_url}/${filePath}`}
                  type="video/mp4"
                />
                <source src={`movie.ogg`} type="video/ogg" />
                Your browser does not support the video tag.
              </video>
              <div className="text-white">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {formatWhatsAppMarkdown(textMessage)}
                </ReactMarkdown>
              </div>
              <div className="text-gray-300 text-[12px]">{formattedDate}</div>
            </div>
          </div>
        </div>
      );

    case "audioMessage":
      return (
        <div className={`flex ${flex}`} id={messageId} key={index}>
          <div className="flex flex-col">
            <div className={`${background} p-2 rounded-lg my-2 max-w-xl`}>
              <audio controls>
                <source
                  src={`${api_url.base_url}/${filePath}`}
                  type="audio/ogg"
                />
                <source src={`horse.mp3`} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
              <div className="text-white">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {formatWhatsAppMarkdown(textMessage)}
                </ReactMarkdown>
              </div>
              <div className="text-gray-300 text-[12px]">{formattedDate}</div>
            </div>
          </div>
        </div>
      );

    case "locationMessage":
      return (
        <div className={`flex ${flex}`} id={messageId} key={index}>
          <div className="flex flex-col">
            <div className={`${background} p-2 rounded-lg my-2 max-w-xl`}>
              <div className="flex items-center">
                <a href={url} target="_blank" rel="noopener noreferrer">
                  <img
                    src={`${api_url.base_url}/${filePathThumb}`}
                    alt=""
                    className="max-w-full h-auto"
                  />
                </a>
              </div>
              <div className="text-gray-300 text-[12px]">{formattedDate}</div>
            </div>
          </div>
        </div>
      );

    case "documentMessage":
      return (
        <div className={`flex ${flex}`} id={messageId} key={index}>
          <div className="flex flex-col">
            <div className="bg-blue-500 p-2 rounded-lg my-2 max-w-xl">
              <div className="flex items-center text-white flex-row justify-between">
                <div className="flex-1 flex items-center">
                  <img
                    src={`${api_url.base_url}/static/document.png`}
                    alt="PDF Icon"
                    className="w-10 h-10 mr-2"
                  />
                  {fileName}
                </div>
                <div>
                  <a
                    href={`${api_url.base_url}/${filePath}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="w-8 h-8 ml-3 border border-black rounded-full">
                      <i className="fas fa-download text-black"></i>
                    </button>
                  </a>
                </div>
              </div>
              <div className="text-white">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {formatWhatsAppMarkdown(textMessage)}
                </ReactMarkdown>
              </div>
              <div className="text-gray-300 text-[12px]">{formattedDate}</div>
            </div>
          </div>
        </div>
      );
    case null:
      return (
        <div className={`flex ${flex}`} id={messageId} key={index}>
          <div className="flex flex-col">
            <div className={`${background} p-2 rounded-lg my-2 max-w-xl`}>
              <div className="text-white">
                <strong>
                  Tidak dapat Menampilkan pesan ini, silahkan lihat langsung
                  memalui aplikasi whatsapp
                </strong>
              </div>
              <div className="text-gray-300 text-[12px]">{formattedDate}</div>
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className={`flex ${flex}`} id={messageId} key={index}>
          <div className="flex flex-col">
            <div className={`${background} p-2 rounded-lg my-2 max-w-xl`}>
              <div className="text-white">
                <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                  {formatWhatsAppMarkdown(textMessage)}
                </ReactMarkdown>
              </div>
              <div className="text-gray-300 text-[12px]">{formattedDate}</div>
            </div>
          </div>
        </div>
      );
  }
};

function formatWhatsAppMarkdown(text) {
  // **Teks Tebal** -> Markdown **bold**
  text = text.replace(/\*(.*?)\*/g, "**$1**");

  // *Teks Miring* -> Markdown *italic*
  text = text.replace(/_(.*?)_/g, "_$1_");

  // ~~Teks Dicoret~~ -> Markdown ~~strikethrough~~
  text = text.replace(/~(.*?)~/g, "~~$1~~");

  // `Teks Monospace` -> Markdown `code`
  text = text.replace(/```(.*?)```/g, "`$1`");

  return text;
}

export { ChatMessageRenderer };
