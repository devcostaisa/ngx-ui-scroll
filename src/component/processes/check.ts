import { Scroller } from '../scroller';
import { Process, ProcessStatus } from '../interfaces/index';

export default class Check {

  static run(scroller: Scroller) {
    const { buffer, state: { fetch } } = scroller;
    let min = Number.POSITIVE_INFINITY, max = Number.NEGATIVE_INFINITY;

    buffer.items.forEach(item => {
      const size = item.size;
      item.setSize();
      if (item.size !== size) {
        buffer.cache.add(item);
        min = Math.min(min, item.$index);
        max = Math.max(max, item.$index);
      }
    });

    if (Number.isFinite(min)) {
      scroller.state.clip.noClip = true;
      fetch.firstIndexBuffer = buffer.firstIndex;
      fetch.lastIndexBuffer = buffer.lastIndex;
      fetch.replace(
        buffer.items.filter(item => item.$index >= min && item.$index <= max)
      );
    }

    scroller.logger.stat('check');

    scroller.callWorkflow({
      process: Process.check,
      status: Number.isFinite(min) ? ProcessStatus.next : ProcessStatus.done
    });
  }

}
