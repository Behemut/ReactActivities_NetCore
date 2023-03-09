import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";

interface Props {
    placeholder: string;
    name: string;
    label?: string;
}

export default function MyTextInput(props: Props) {
    const {placeholder, name, label} = props;
    const [field, meta, helpers] = useField(name);
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{label}</label>
            <input {...field} placeholder={placeholder} />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}
        </Form.Field>
    )
}