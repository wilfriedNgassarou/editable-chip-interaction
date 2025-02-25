import clsx from "clsx"
import { AnimatePresence, motion } from "motion/react"
import { useRef, useState } from "react"
import { Check } from "./components/svgs/check"
import { Pencil } from "./components/svgs/pencil"

function App() {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState('Divan')

  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <section className="w-full h-dvh flex justify-center items-center text-xl">
      <motion.div
        layout
        initial={{
          borderColor: 'white',
          boxShadow: '0px 0px 2px rgba(0, 0, 0, .4)'
        }}
        animate={{
          borderColor: isEditing ? 'black' : 'white',
          boxShadow: isEditing ? 'none' : '0px 0px 2px rgba(0, 0, 0, .4)'
        }}
        className="flex items-center relative gap-2 h-14 pl-4 pr-11 overflow-hidden border-[1.5px]"
        style={{ borderRadius: 60 }}
      >
        <motion.input
          layout="position"
          ref={inputRef}
          layoutId="input-text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          readOnly={!isEditing}
          className={clsx(
            "h-full bg-transparent outline-none",
            isEditing ? "text-black" : "text-gray-500",
            isEditing ? "w-36" : "w-28"
          )}
        />
        <AnimatePresence initial={false}>
          {!isEditing ? (
            <motion.span
              key="pen"
              layout="position" 
              initial={{ x: 50 }}
              animate={{ x: 0 }}
              exit={{ x: 50 }}
              transition={{ type: 'spring', bounce: .1 }}
              onClick={() => {
                setIsEditing(true)

                if(inputRef.current) inputRef.current.select()
              }}
              className=" absolute right-1 flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 cursor-pointer"
            >
              <Pencil />
            </motion.span>
          ): (
            <motion.span
              key="check"
              layout="position" 
              initial={{ x: 50 }}
              animate={{ x: 0 }}
              exit={{ x: 50 }}
              transition={{ type: 'spring', bounce: .1 }}
              onClick={() => setIsEditing(false)}
              className="absolute z-20 right-1 flex items-center justify-center h-10 w-10 rounded-full bg-black cursor-pointer"
            >
              <Check />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}

export default App
