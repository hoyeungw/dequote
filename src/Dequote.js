import { Ob } from 'veho'
import { greys } from 'spettro'
import { paint, ind } from './helpers'

export class Dequote {
  /**
   *
   * @param {Object<string,string>} roles
   * @param {function(*)} [logger]
   * @param {string} [defaultColor]
   * @param {string} [callSign=' -> ']
   */
  constructor (roles, { logger, defaultColor, callSign = ' -> ' } = {}) {
    this.logger = logger || console.log.bind(console)
    this.defaultColor = defaultColor || greys.grey.base
    this.de = callSign
    this.actors = Ob.map(roles, ([role, hexColor]) => [role, paint(role, hexColor)])
  }

  static build (actors, { logger, defaultColor } = {}) {
    return new Dequote(actors, { logger, defaultColor })
  }

  actor (actor) {
    return (actor in this.actors)
      ? this.actors[actor]
      : paint(actor, this.defaultColor)
  }

  role (actor) {
    return actor instanceof Array
      ? actor.map(x => `[${this.actor(x)}]`).join(this.de)
      : `[${this.actor(actor)}]`
  }

  says (actor, message, { indent = 0 } = {}) {
    `${ind(indent)}[${this.actor(actor)}] ${message}` |> this.logger
  }

  credit (actor, { indent = 0 } = {}) {
    return this.sourceLogger(this.role(actor), { indent })
  }

  sourceLogger (role, { indent = 0 } = {}) {
    return message => `${ind(indent)}${role} ${message}` |> this.logger
  }
}

