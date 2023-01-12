namespace rest_api_dotnet.Models
{
    public class Greeting
    {
        public int Id { get; set; }
        public string Recipient { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public string Sender { get; set; } = string.Empty;
    }
}
