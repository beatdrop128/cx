import * as Cx from '../core';
import {RenderingContext} from "./RenderingContext";
import {View} from "../data/View";

export class Instance {
   init(context: RenderingContext): void;

   explore(context: RenderingContext): boolean;

   prepare(context: RenderingContext): void;

   cleanup(context: RenderingContext): void;

   render(context: RenderingContext, keyPrefix?: string): void;

   setState(state: Cx.Record): void;

   set(prop: string, value: any);

   readonly store: View;
   readonly data: Cx.Record;
   readonly widget: Cx.Config;
}
