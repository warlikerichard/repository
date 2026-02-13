import { Mail, Linkedin, Github } from "lucide-react";
import { BsWhatsapp as Whatsapp} from "react-icons/bs";
import { userData } from "@/lib/data/userData";

export function ContactTab() {
  return (
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white mb-2">
          Vamos Trabalhar Juntos?
        </h2>
        <p className="text-slate-400">
          Estou disponível para novas oportunidades em desenvolvimento de
          software.
        </p>
      </div>

      <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500" />

        <div className="space-y-6">
          <div className="flex items-center gap-4 p-4 bg-slate-950 rounded-lg border border-slate-800">
            <div className="bg-green-900/20 p-3 rounded-full text-green-500">
              <Mail size={24} />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-mono">EMAIL</div>
              <a
                href={`mailto:${userData.contact.email}`}
                className="text-white hover:text-green-400 transition-colors font-medium"
              >
                {userData.contact.email}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-slate-950 rounded-lg border border-slate-800">
            <div className="bg-blue-900/20 p-3 rounded-full text-blue-500">
              <Linkedin size={24} />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-mono">LINKEDIN</div>
              <a
                href={`https://linkedin.com/in/${userData.contact.linkedin}`}
                target="_blank"
                rel="noreferrer"
                className="text-white hover:text-blue-400 transition-colors font-medium"
              >
                Ver Perfil Profissional
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-slate-950 rounded-lg border border-slate-800">
            <div className="bg-slate-800 p-3 rounded-full text-white">
              <Github size={24} />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-mono">GITHUB</div>
              <a
                href={`https://github.com/${userData.contact.github}`}
                target="_blank"
                rel="noreferrer"
                className="text-white hover:text-slate-300 transition-colors font-medium"
              >
                @{userData.contact.github}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-slate-950 rounded-lg border border-slate-800">
            <div className="bg-slate-800 p-3 rounded-full text-white">
              <Whatsapp size={24} color="#4bd659"/>
            </div>
            <div>
              <div className="text-xs text-slate-500 font-mono">WHATSAPP</div>
              <a
                href={`https://wa.me/55${userData.contact.whatsapp.replaceAll("(", "").replaceAll(")", "").replaceAll(" ", "").replaceAll("-", "")}`}
                target="_blank"
                rel="noreferrer"
                className="text-white hover:text-slate-300 transition-colors font-medium"
              >
                {userData.contact.whatsapp}
              </a>
            </div>
          </div>
        </div>



        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm">
            Localização: {userData.location} • {userData.phone}
          </p>
        </div>
      </div>
    </div>
  );
}
