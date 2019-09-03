import { Scroller } from '../scroller';
import { Process, ProcessStatus } from '../interfaces/index';

export default class Start {

  static run(scroller: Scroller, process: Process) {
    const { state, state: { workflowOptions, scrollState, fetch, clip } } = scroller;

    state.loopPending = true;
    if (!fetch.simulate) {
      fetch.reset();
    }
    if (!clip.simulate && !clip.force) {
      clip.reset();
    }
    scrollState.scroll = workflowOptions.scroll || false;
    scrollState.keepScroll = false;

    scroller.callWorkflow({
      process: Process.start,
      status: ProcessStatus.next,
      payload: process
    });
  }

}
