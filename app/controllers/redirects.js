module.exports = {
    index: (req, res) => res.redirect('/'),
    adminDashboard: (req, res) => res.redirect('/admin/dashboard'),
    adminExistingCase: (req, res) => res.redirect(`/admin/existing-case/${res.locals.record._id}`),
    adminUpdateMyDetails: (req, res) => res.redirect('/admin/update-my-details'),
    goneWrong: (req, res) => res.redirect('/errors/goneWrong'),
    notFound: (req, res) => res.redirect('/errors/notFound')
};
