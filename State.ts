class State<tState> {
  private _state: tState;
  private _subscribers: Array<(state: tState) => void> = [];

  constructor(initialState: tState) {
    this._state = initialState;
  }

  public get() {
    const condition =
      this._state instanceof Array || this._state instanceof Object;

    if(!condition) {
      return this._state;
    }

    let properties = {};

    for(const key in this._state) {
      if((this._state as Object).hasOwnProperty(key)) {
        properties = {
          ...properties,
          [key]: this._state[key]
        };
      }
    }

    return properties;
  }

  public getState() {
    return this._state;
  }

  public set(state: tState) {
   const condition =
      this._state instanceof Array || this._state instanceof Object;

    if(!condition) {
      this._state = state;
      this.notifySubscribers();
      return;
    }

    for(const key in state) {
      if((state as Object).hasOwnProperty(key)) {
        this._state[key] = state[key];
      }
    }

    this.notifySubscribers();
    return;
  }

  public subscribe(subscriber: (state: tState) => void) {
    this._subscribers.push(subscriber);
  }

  private notifySubscribers() {
    this._subscribers.forEach(subscriber => subscriber(this._state));
  }
}
