export namespace Java {
  export interface Identities {
    upperCamel: string;
    lowerCamel: string;
    snake: string;
  }

  export const toIdentities = (value: string): Identities => {
    const words = value.split("_");

    return {
      upperCamel: words
        .map((word) => word.charAt(0).toUpperCase().concat(word.substring(1)))
        .join(""),
      lowerCamel: words
        .map((word, index) =>
          index === 0
            ? word
            : word.charAt(0).toUpperCase().concat(word.substring(1))
        )
        .join(""),
      snake: value,
    };
  };

  export enum IdentityKind {
    UpperCamel,
    LowerCamel,
    Snake,
  }

  export const toUpperCamel = (value: string) => {
    return value
      .split("_")
      .map((word) => {
        return word.charAt(0).toUpperCase().concat(word.substring(1));
      })
      .join("");
  };

  export const toLowerCamel = (value: string) => {
    return value
      .split("_")
      .map((word, index) => {
        if (index === 0) return word;
        return word.charAt(0).toUpperCase().concat(word.substring(1));
      })
      .join("");
  };

  export const toSnake = (value: string) => value;

  export const toIdentity = (value: string, kind: IdentityKind) => {
    switch (kind) {
      case IdentityKind.UpperCamel:
        return () => {
          return toUpperCamel(value);
        };

      case IdentityKind.LowerCamel:
        return () => {
          return toLowerCamel(value);
        };

      case IdentityKind.Snake:
        return () => {
          return toSnake(value);
        };
    }
  };
}
