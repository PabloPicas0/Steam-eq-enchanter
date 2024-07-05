export type AreaPropsModel = {
  data?: [string, number, string][] | null;
  targetPrice: number;
  changeTargetPrice(e: number): void
  width?: number;
  height?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
};
