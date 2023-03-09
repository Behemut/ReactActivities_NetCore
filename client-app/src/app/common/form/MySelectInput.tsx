import { useField } from "formik";
import { Form, Label, Select } from "semantic-ui-react";

interface Props {
    placeholder: string;
    name: string;
    label?: string;
    options: any;
}

export default function MySelectInput(props: Props) {
    const {placeholder, name, label} = props;
    const [field, meta, helpers] = useField(name);
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{label}</label>
            <Select 
                clearable
                options={props.options}
                value={field.value || null}
                onChange={(e, data) => helpers.setValue(data.value)}
                placeholder={placeholder}
                onBlur={() => helpers.setTouched(true)}
             />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}
        </Form.Field>
    )
}