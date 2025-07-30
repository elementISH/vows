export default function zodFieldValidator(schemaField, value) {
  const result = schemaField.safeParse(value);
  return result.success ? undefined : result.error.issues[0].message;
}
