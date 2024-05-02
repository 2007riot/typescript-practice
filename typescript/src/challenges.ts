
export function twoFer(name?: string) :string {
    if (name != undefined) {
       return `One for ${name}, one for me.`
    } else {
        return `One for you, one for me.`
    }

    // return name !== undefined ? `One for ${name}, one for me.` : `One for you, one for me.`;
  }
  twoFer()
  twoFer("galina")