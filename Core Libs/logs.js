// for execute csom
function onQueryFailed(sender, args) {
    console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
}

// Display error messages.
function onError(error) {
    console.log(error.responseText);
}


