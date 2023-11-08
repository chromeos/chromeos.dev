import type { BlockDecoratorProps } from 'sanity';
import { CgKeyboard } from 'react-icons/cg';

export const KBDComponent = (props: BlockDecoratorProps) => {
  return (
    <kbd
      style={{
        backgroundColor: '#f1f3f4',
        borderRadius: '3px',
        boxShadow: '1px 1px 1px #606367',
        display: 'inline-block',
        fontSize: '.8em',
        fontVariant: 'small-caps',
        letterSpacing: '1px',
        margin: '0 .125em',
        padding: '0 .5em',
        textRendering: 'optimizeLegibility',
        textTransform: 'lowercase',
        verticalAlign: 'text-bottom',
        color: 'black',
      }}
    >
      {props.children}
    </kbd>
  );
};

export const KBDDecorator = {
  title: 'Keyboard',
  value: 'kbd',
  icon: CgKeyboard,
  component: KBDComponent,
};
