//import { ForwardedRef, forwardRef } from "react"
import { UseFormRegisterReturn } from "react-hook-form";

interface IInputProps{
    type: "text" | "email" | "number" | "password" | "search";
    label?: string;
    disabled?: boolean;
    register: UseFormRegisterReturn<string>;
}

export const Input = ({type, label, disabled, register}: IInputProps) => {
    return(
        <div>
            {label ? <label>{label}</label> : null}
            <input type={type} disabled={disabled} {...register} />
        </div>
    )
}

/*
export const Input = forwardRef(({type, label, disabled, ...rest}: IInputProps, ref: ForwardedRef<HTMLInputElement>) => {
    return(
        <div>
            {label ? <label>{label}</label> : null}
            <input type={type} ref={ref} disabled={disabled} {...rest} />
        </div>
    )
})
*/