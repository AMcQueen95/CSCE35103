import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.SocketException;
import java.nio.ByteBuffer;

public class UDPServer
{
	public static void main(String[] args) throws Exception
	{
		DatagramSocket ds = new DatagramSocket(7501); //Receive port
		byte[] receive = new byte[4]; //Receiving a single int

		DatagramPacket DpReceive = null;
        
		while (true) //Constantly searches for received datagrams
		{
			DpReceive = new DatagramPacket(receive, receive.length); //Packet which recieves data

			ds.receive(DpReceive); //Receives that data in byte buffer

			//Need to include a map of int codes and methods to interact with the database
            //Also need to figure out what is giving the codes to send and the way they are sent
            //and how those things interact with server

			receive = new byte[4]; //Refreshes the byte
		}
	}

    public void sendDatagram(int code) throws Exception
    {
        DatagramSocket ds = new DatagramSocket(7500); //Use 7500 to send datagram
        byte[] send = convertIntToByteArray(code); //Converts the code to a byte[] to add to datagram

        DatagramPacket DpSend = new DatagramPacket(send, send.length); //Creates datagram with code to send through socket

        ds.send(DpSend); 

        ds.close(); //Close bc memory leaks
    }

    //Decode the byte
	public static int convertByteArrayToInt(byte[] bytes) { //Just look at the name
        return ByteBuffer.wrap(bytes).getInt();
    }

    //Enconde the byte
    public static byte[] convertIntToByteArray(int code) //Just look at the name
    {
        return ByteBuffer.allocate(4).putInt(value).array();
    }
}