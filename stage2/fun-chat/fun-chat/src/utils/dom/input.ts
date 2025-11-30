import { Input } from '../../types/elements/input';

export function createInputElement({
  type,
  placeholder,
  classes,
  value,
  id,
  name,
  disabled = false,
  required = false,
}: Input): HTMLInputElement {
  const input = document.createElement('input');
  input.type = type;
  value && (input.value = value);
  id && (input.id = id);
  name && (input.name = name);
  placeholder && (input.placeholder = placeholder);
  classes.length && input.classList.add(...classes);
  input.disabled = disabled;
  input.required = required;
  return input;
}
