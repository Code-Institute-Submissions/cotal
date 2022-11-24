export const checkEquality = (data, dataTwo, server) => {
  let serverChanges = {};

  if (server) {
    const formEntries = Object.entries(data);
    const socialsEntries = Object.entries(dataTwo);
    const serverEntries = Object.entries(server);

    formEntries.forEach((obj, idx) => {
      if (typeof obj[1] === `object`) {
        if (obj[1] !== null) {
          if (obj[0] === `image`) {
            if (serverEntries[idx][1]?.name !== obj[1].name) {
              serverChanges[obj[0]] = obj[1];
            }
          }
        }
      } else {
        if (serverEntries[idx][1] !== obj[1]) {
          if (formEntries[idx][1] !== undefined) {
            if (formEntries[idx][0] === `linktrees`) {
              if (serverEntries[idx][1][0].username !== obj[1]) {
                serverChanges[obj[0]] = [
                  { id: serverEntries[idx][1][0].id, username: obj[1] },
                ];
              }
            } else {
              serverChanges[obj[0]] = obj[1];
            }
          }
        }
      }
    });

    serverChanges.socials = {};
    socialsEntries.forEach((o, idx) => {
      if (serverEntries[4][1][idx]?.username !== o[1].username) {
        if (serverEntries[4][1][idx]?.id) {
          serverChanges[`socials`][o[0]] = {
            id: serverEntries[4][1][idx].id,
            username: o[1].username,
          };
        } else {
          serverChanges[`socials`][o[0]] = o[1];
        }
      }
    });

    const socialsLength = { ...serverChanges.socials };
    if (Object.keys(socialsLength).length === 0)
      delete serverChanges[`socials`];

    if (Object.keys(serverChanges).length === 0) return null;
  } else if (data.content) {
    delete data.content;

    if (data.id) {
      delete data.id;
      if (dataTwo?.id) delete dataTwo.id;
      if (dataTwo?.profile) delete dataTwo.profile;
      if (dataTwo?.slug) delete dataTwo.slug;
      if (dataTwo?.created_on) delete dataTwo.created_on;
      if (dataTwo?.tags && !dataTwo.tags.length) delete dataTwo.tags;
      if (dataTwo?.comment_count) delete dataTwo.comment_count;
      if (dataTwo?.postcomments) delete dataTwo.postcomments;

      const formEntries = Object.entries(data);
      const serverEntries = Object.entries(dataTwo);

      serverEntries.forEach((serverEntry, idx) => {
        if (serverEntry[0] === `image`) {
          if (serverEntry[1] === null) {
            serverChanges[formEntries[idx][0]] = formEntries[idx][1];
          } else {
            if (serverEntry[1] !== formEntries[idx][1]) {
              const serverImage = serverEntry[1];
              const lastSlash = serverImage.lastIndexOf(`/`);
              const serverImageName = serverEntry[1].substring(
                lastSlash,
                serverImage.lastIndexOf(`_`) - 1
              );

              const formImage = formEntries[idx][1].name;
              const formImageName = formImage.substring(
                0,
                formImage.lastIndexOf(`.`) - 1
              );

              if (serverImageName !== formImageName) {
                serverChanges[formEntries[idx][0]] = formEntries[idx][1];
              }
            }
          }
        } else {
          if (serverEntry[1] && formEntries[idx]) {
            if (serverEntry[1] !== formEntries[idx][1])
              serverChanges[formEntries[idx][0]] = formEntries[idx][1];
          }
        }
      });
    } else {
      Object.entries(data).forEach((item) => {
        if (item[0] === `image` && item[1].name.length) {
          serverChanges[item[0]] = item[1];
        } else if (item[1].length) serverChanges[item[0]] = item[1];
      });
    }

    if (Object.keys(serverChanges).length === 0) return null;
  }

  return serverChanges;
};
