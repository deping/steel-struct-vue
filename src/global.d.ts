declare namespace rightHand {
  interface Point {
    x: number;
    y: number;
  }
  function loadObjects(ar: any[]): any[]; // fabric.Object[]
  function makeLine(points: number[], options: object): any; // fabric.Line2
  function makePolyline(points: Point[], options: object): any; // fabric.Polyline2
  function makePolygon(points: Point[], options: object): any; // fabric.Polygon2
  function makeText(text: string, options: object): any; // fabric.Text2
  function makeDimAln(options: object): any; // fabric.DimAln2
  function makeDimAng(options: object): any; // fabric.DimAng2
  function makeRect(options: object): any; // fabric.Rect2
  function makeCircle(options: object): any; // fabric.Circle2
}
