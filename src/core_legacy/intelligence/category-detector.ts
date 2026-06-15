export interface CategoryResult {
  category: string;
  confidence: number;
}

export class CategoryDetector {
  private readonly rules: Record<string, string[]> = {
    electronics: [
      "phone",
      "iphone",
      "android",
      "laptop",
      "computer",
      "keyboard",
      "mouse",
      "monitor",
      "tablet",
      "camera",
      "speaker",
      "headphone",
      "earbuds",
      "charger",
      "usb",
      "ssd",
      "router"
    ],

    fashion: [
      "shirt",
      "tshirt",
      "t-shirt",
      "hoodie",
      "jacket",
      "jeans",
      "dress",
      "shoe",
      "sneaker",
      "bag",
      "watch",
      "cap",
      "hat",
      "belt"
    ],

    beauty: [
      "cream",
      "serum",
      "lotion",
      "makeup",
      "lipstick",
      "perfume",
      "shampoo",
      "conditioner",
      "skincare",
      "beauty"
    ],

    home: [
      "chair",
      "table",
      "sofa",
      "lamp",
      "curtain",
      "blanket",
      "pillow",
      "kitchen",
      "storage",
      "shelf"
    ],

    fitness: [
      "dumbbell",
      "fitness",
      "gym",
      "yoga",
      "resistance",
      "exercise",
      "protein",
      "workout"
    ],

    pet: [
      "dog",
      "cat",
      "pet",
      "leash",
      "collar",
      "aquarium",
      "bird"
    ],

    toys: [
      "toy",
      "lego",
      "puzzle",
      "game",
      "drone",
      "rc",
      "action figure"
    ],

    automotive: [
      "car",
      "automotive",
      "motorcycle",
      "tire",
      "engine",
      "dashcam",
      "vehicle"
    ],

    baby: [
      "baby",
      "stroller",
      "diaper",
      "feeding",
      "infant",
      "newborn"
    ]
  };

  detect(
    title: string,
    description?: string
  ): CategoryResult {
    const text =
      `${title || ""} ${description || ""}`
        .toLowerCase()
        .trim();

    let bestCategory = "general";
    let bestScore = 0;

    for (const [category, keywords] of Object.entries(this.rules)) {
      let score = 0;

      for (const keyword of keywords) {
        if (text.includes(keyword)) {
          score++;
        }
      }

      if (score > bestScore) {
        bestScore = score;
        bestCategory = category;
      }
    }

    const confidence =
      bestScore === 0
        ? 0.25
        : Math.min(
            0.99,
            0.5 + bestScore * 0.1
          );

    return {
      category: bestCategory,
      confidence,
    };
  }
}

export const categoryDetector =
  new CategoryDetector();
