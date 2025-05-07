import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RobotPov from "../assets/robot-pov.svg";
import ControlSwitch from "../assets/control-switch.svg";
import DPadJ1J2 from "../assets/d-pad-j1j2.svg";
import DPadJ5 from "../assets/d-pad-j5.svg";
import DPadJ3J4 from "../assets/d-pad-j3j4.svg"
import DPadJ6 from "../assets/d-pad-j6.svg"
import { Editor } from "@monaco-editor/react";

function Borders({ children }) {
  return (
    <div className="bg-[#FFFFFF] border-8 border-[#F6F6F6] h-full rounded-3xl shadow-md flex flex-col justify-center items-center px-3">
      {children}
    </div>
  )
}

function FieldsControlPannel() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full gap-15">
      <div className="grid grid-rows-3 grid-cols-2 gap-8 w-full">
        <div className="flex justify-center items-center gap-1">
          <Borders>
            <input 
              className="w-full text-primary-text font-outfit text-lg"
              placeholder="J1 Cordinate..."
              type="number"  
            />
          </Borders>
        </div>
        <div className="flex justify-center items-center gap-1">
          <Borders>
            <input 
              className="w-full text-primary-text font-outfit text-lg"
              placeholder="J2 Cordinate..."
              type="number"  
            />
          </Borders>
        </div>
        <div className="flex justify-center items-center gap-1">
          <Borders>
            <input 
              className="w-full text-primary-text font-outfit text-lg"
              placeholder="J3 Cordinate..."
              type="number"  
            />
          </Borders>
        </div>
        <div className="flex justify-center items-center gap-1">
          <Borders>
            <input 
              className="w-full text-primary-text font-outfit text-lg"
              placeholder="J4 Cordinate..."
              type="number"  
            />
          </Borders>
        </div>
        <div className="flex justify-center items-center gap-1">
          <Borders>
            <input 
              className="w-full text-primary-text font-outfit text-lg"
              placeholder="J5 Cordinate..."
              type="number"  
            />
          </Borders>
        </div>                
        <div className="flex justify-center items-center gap-1">
          <Borders>
            <input 
              className="w-full text-primary-text font-outfit text-lg"
              placeholder="J6 Cordinate..."
              type="number"  
            />
          </Borders>
        </div>
      </div>

      <button className="bg-[#F6F6F6] w-1/2 rounded-3xl shadow-md items-center  text-primary-text font-outfit text-xl py-2">
        Move
      </button>
    </div>
  )
}


function DPadsControlPannel() {
  return (
    <div className="grid grid-rows-2 grid-cols-2 items-center gap-4 p-10 w-full h-full">

    </div>
  )
}

export default function RobotController() {
  const [isFieldControlPanel, setIsFieldControlPanel] = useState(true);

  return (
    <main className="flex flex-col items-center justify-center">
      <Header />
      <section
        className="bg-background h-[calc(100vh-4rem)] w-full px-16 py-15 grid grid-cols-[4fr_3fr] grid-rows-2 gap-10"
      >
        <div className="flex flex-col gap-3 w-full h-full">
          <h1 className="text-primary-text font-outfit text-xl">
            Constructor University UR5e Lab - 18:20
          </h1>
          <img src={RobotPov} alt="Robot POV" className="h-full w-full" />
        </div>

        <div className="flex flex-col gap-3 w-full h-full">
          <div className="flex items-center w-full">
            <h1 className="text-primary-text font-outfit text-xl">
              Control Panel
            </h1>
            <button className="ml-auto" onClick={() => setIsFieldControlPanel(prev => !prev)}>
              <img src={ControlSwitch} alt="Control Switch"/>
            </button>
          </div>
          <div className="w-full h-full bg-[#E1E3E6] rounded-3xl shadow-md p-5">
            <div className="flex justify-center items-center w-full h-full">
              {isFieldControlPanel ? (
                <FieldsControlPannel />
              ) : (
                <DPadsControlPannel />
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full h-full">
          <h1 className="text-primary-text font-outfit text-xl">
            Code Editor
          </h1>
          <Borders>
            <Editor
              height="90%"
              width="100%"
              defaultLanguage="python"
              defaultValue={`# Write your URScript or Python code here`}
              theme="custom-theme"
              onMount={(editor, monaco) => {
                monaco.editor.defineTheme("custom-theme", {
                  base: "vs", // use "vs-dark" if you prefer a dark base
                  inherit: true,
                  rules: [],
                  colors: {
                    "editor.background": "#FFFFFF",
                    "editor.foreground": "#1A1A1A", // matches your primary text
                    "editor.lineHighlightBackground": "#FFFFFF",
                    "editorCursor.foreground": "#333333",
                    "editorLineNumber.foreground": "#7D8B99",
                    "editor.selectionBackground": "#B4C4D2",
                  }
                });

                monaco.editor.setTheme("custom-theme");
              }}
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                automaticLayout: true,
                scrollbar: {
                  verticalScrollbarSize: 6,
                  horizontalScrollbarSize: 6
                },
                wordWrap: "on"
              }}
            />
          </Borders>
        </div>

        <div className="flex flex-col gap-3 w-full h-full">
          <h1 className="text-primary-text font-outfit text-xl">
            Terminal
          </h1>
          <Borders/>
        </div>
      </section>
      <Footer />
    </main>
  )  
}