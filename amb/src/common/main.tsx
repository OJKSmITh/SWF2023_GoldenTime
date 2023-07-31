import { Header } from "@components/Header"
import { Select } from "@components/select"
import { Button } from "@components/button"

export const Main = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const level = (form.querySelector("#level") as HTMLSelectElement).value
        const gender = (form.querySelector("#gender") as HTMLSelectElement).value
        const age = (form.querySelector("#ages") as HTMLSelectElement).value
        const state = (form.querySelector("#state") as HTMLTextAreaElement).value
        console.log(level, gender, age, state)
        if (level || gender || age === "선택") return
        console.log("submit")
    }
    return (
        <form onSubmit={handleSubmit}>
            <Header subject={"발생"} />
            <Select id="level"></Select>
            <Select id="ages"></Select>
            <Select id="gender"></Select>
            <Select id="state"></Select>
            <Button
                id={"submit"}
                text={"제출하기"}
                bg={"#e24f4f"}
                height={"5rem"}
                width={"100%"}
                margin={"3rem 0 0 0"}
            ></Button>
        </form>
    )
}
