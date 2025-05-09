export const Input = ({label, register, name, placeholder, type='text' }) => {
    return (<div>
        <label htmlFor={name}>{label}:</label>
        <input

            {...register(name)}
            placeholder={placeholder}
            type={type}
        />
    </div>)
}