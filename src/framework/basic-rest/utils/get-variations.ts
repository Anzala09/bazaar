import groupBy from "lodash/groupBy";

export function getVariations(variations: object | undefined) {
  if (!variations) return {};
  return groupBy(variations, "attribute.slug");
}

export function getVariationsV2(sizes: object | undefined, colors: object | undefined) {
  if (!sizes && !colors) return {};

  let orderedSizes = [];
  for (let i = 0; i < sizes?.length; i++) {
    let item = {
      "id": sizes[i].id,
      "value": sizes[i].attributes.Size,
      "attributes": {
        "id": sizes[i].id,
        "name": "Size",
        "slug": "size"
      }
    }
    orderedSizes.push(item);
  }

  let orderedColors = [];
  for (let i = 0; i < colors?.length; i++) {
    let item = {
      "id": colors[i].id,
      "value": colors[i].attributes.ColorName,
      "meta": colors[i].attributes.ColorHex,
      "attributes": {
        "id": colors[i].id,
        "name": "Color",
        "slug": "color"
      }
    }
    orderedColors.push(item);
  }

  let orderedVariations = {}
  if (orderedSizes.length > 0) {
    orderedVariations["size"] = orderedSizes;
  }
  if (orderedSizes.length > 0) {
    orderedVariations["color"] = orderedColors;
  }
  return orderedVariations;
}
