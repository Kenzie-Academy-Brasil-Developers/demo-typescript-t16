import { ForwardedRef, forwardRef, InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement>{
    label?: string;
    error?: FieldError;
} 

export const Input = forwardRef(({label, error, ...rest}: IInputProps, ref: ForwardedRef<HTMLInputElement>) => (
    <div>
        {label ? <label>{label}</label> : null}
        <input ref={ref} {...rest} />
        {error ? <p>{error.message}</p> : null}
    </div>
))

/*
interface IInputProps{
    label?: string;
    error?: FieldError;
    type: "text" | "number" | "email" | "password";
    placeholder?: string;
    register: UseFormRegisterReturn<string>;
    disabled?: boolean;
}

export const Input = ({label, error, type, placeholder, register, disabled}: IInputProps) => {
    return(
        <div>
        {label ? <label>{label}</label> : null}
        <input type={type} placeholder={placeholder} disabled={disabled} {...register} />
        {error ? <p>{error.message}</p> : null}
    </div>
    )
}
*/
