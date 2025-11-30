import { Anchor } from '../../types/elements/anchor';

export function createAnchorElement({ href, target = '_self', text, classes = [], id }: Anchor): HTMLAnchorElement {
  const anchor = document.createElement('a');
  anchor.href = href;
  anchor.target = target;
  text && (anchor.textContent = text);
  id && (anchor.id = id);
  classes.length && anchor.classList.add(...classes);
  return anchor;
}
