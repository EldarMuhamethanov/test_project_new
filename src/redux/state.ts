import React, { useState } from 'react';

const state: any = {
  [count, setCount] : useState<number>(0);
  [shapes, setShapes] : useState<Array<ShapesType>>([]);
  [selectedShape, setSelectedShape] : useState<number | null>(null);
}