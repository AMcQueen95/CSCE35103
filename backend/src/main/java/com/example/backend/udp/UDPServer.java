package com.example.backend.udp;

import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.nio.ByteBuffer;

import org.springframework.stereotype.Component;

@Component
public class UDPServer {
    public void receiveDatagram() {
        try (DatagramSocket socket = new DatagramSocket(7500)) { // Listening on port 7500
            byte[] receiveBuffer = new byte[4]; // Buffer to hold incoming datagrams
            
            while (true) {
                DatagramPacket packet = new DatagramPacket(receiveBuffer, receiveBuffer.length);
                socket.receive(packet); // Receive the packet
                int data = this.convertByteArrayToInt(receiveBuffer);
                System.out.println("New Player ID: " + data);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void sendDatagram(String host, int port, int playerId) {
        try (DatagramSocket socket = new DatagramSocket()) { // Create a DatagramSocket for sending
            byte[] sendBuffer = convertIntToByteArray(playerId);
            InetAddress address = InetAddress.getByName(host);
            DatagramPacket packet = new DatagramPacket(sendBuffer, sendBuffer.length, address, port);
            socket.send(packet); // Send the datagram
        } catch (Exception e) {
            e.printStackTrace(); // Handle exceptions appropriately
        }
    }

    // Decode the byte array to an int
    private  int convertByteArrayToInt(byte[] bytes) {
        return ByteBuffer.wrap(bytes).getInt();
    }

    // Encode the int to a byte array
    private byte[] convertIntToByteArray(int code) {
        return ByteBuffer.allocate(4).putInt(code).array();
    }
}