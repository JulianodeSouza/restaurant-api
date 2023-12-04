async function trataExcecao(res, e) {
  if (e.requestErrors) {
    res.json({ message: e.message || e, details: e.requestErrors });

    return;
  }

  res.json({ error: e.message || e });
}

module.exports = {
  trataExcecao,
};
