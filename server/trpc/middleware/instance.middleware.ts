export function instanceMiddleware() {
  return middleware(async opts => {
    const { ctx } = opts

    const instanceString = getCookie(ctx.ev, 'instanceId')
    let instanceId: number | undefined

    if (instanceString) {
      try {
        instanceId = JSON.parse(instanceString)

        ctx.ev.context.instanceId = instanceId
      } catch { }
    }

    return opts.next({
      ctx: { ...ctx, instanceId },
    })
  })
}
