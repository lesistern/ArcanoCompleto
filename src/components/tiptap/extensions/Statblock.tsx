import { Node, mergeAttributes, ReactNodeViewRenderer } from '@tiptap/react';
import { StatblockView } from '../nodeviews/StatblockView';

export interface StatblockAttrs {
  entryId: string | null;
  entryType: string; // monster | item | spell | npc | ...
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    statblock: { insertStatblock: (attrs: StatblockAttrs) => ReturnType };
  }
}

export const Statblock = Node.create({
  name: 'statblock',
  group: 'block',
  atom: true,
  draggable: true,
  addAttributes() {
    return {
      entryId: { default: null },
      entryType: { default: 'monster' },
    };
  },
  parseHTML() { return [{ tag: 'div[data-statblock]' }]; },
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, {
      'data-statblock': 'true',
      'data-entry-id': HTMLAttributes.entryId,
      'data-entry-type': HTMLAttributes.entryType,
      class: 'statblock-placeholder',
    }), 0];
  },
  addCommands() {
    return {
      insertStatblock: (attrs: StatblockAttrs) => ({ commands }) =>
        commands.insertContent({ type: this.name, attrs }),
    };
  },
  addNodeView() {
    return ReactNodeViewRenderer(StatblockView);
  },
});
