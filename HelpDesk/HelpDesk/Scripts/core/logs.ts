// Display error messages. 
function onError(error) {
    console.log(error.responseText);
}

function onQueryFailed(sender: any, args: any);
function onQueryFailed(sender, args) {
    console.log(`request failed ${args.get_message()}\n${args.get_stackTrace()}`);
}